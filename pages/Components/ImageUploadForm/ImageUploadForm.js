import React, { useState, useCallback } from 'react' 
import { Form, Button, FormControl} from 'react-bootstrap' 
import classes from './ImageUploadForm.module.css' 
import axios from 'axios' 
import Message from '../Message/Message' // NEW 
const ImageUploadForm = (props) => { 
    let [alert, setAlert] = useState(null) // NEW 
    let [file, setFile] = useState(null) 
    let [fileSrc, setFileSrc] = useState('') 
    let [galleryName, setGalleryName] = useState('friend')
    let [name, setName] = useState('')
    const fileStaging = useCallback((e) => {
        if (props.type === 'file') {
            setFile(e.target.files[0])
    
            let reader = new FileReader();
    
            try {
                reader.readAsDataURL(e.target.files[0])
            } catch (e) {
                setAlert({variant:'danger', text:'Please select valid image.'})  // NEW
                setFileSrc('')
            }
    
            reader.addEventListener("load", function() {
                setFileSrc(reader.result)
            }, false)
        } else {
            setFileSrc(e.target.value)
        }
    }, [props.type])
    const handleSubmit = (e) => {
        e.preventDefault()
        
        setAlert(null)             // NEW
        let data = {
            gallery_name: galleryName,
            image: fileSrc
        }
        if (props.endpoint === 'enroll') {
            data = {
                ...data,
                subject_id: name
            }
        }
        axios.post(`/api/upload/${props.endpoint}`, data)
        .then(response => {
            setAlert(response.data)     // NEW
        })
        .catch(e => {
            setAlert(e.response.data)   // NEW
        })
    }
    return (
        <Form onSubmit={handleSubmit} className="my-4">
            {alert && <Message message={alert} />}          // NEW
            <Form.Row className="text-left">
                <Form.Group>
                    <Form.Label>Gallery</Form.Label>
                    <Form.Text className="text-muted">
                        Select upload gallery.
                    </Form.Text>
                    <Form.Check 
                        type="radio"
                        label="Friend"
                        checked={galleryName === "friend"}
                        onChange={() => setGalleryName("friend")}
                        />
                    <Form.Check 
                        type="radio"
                        label="Foe"
                        checked={galleryName === "foe"}
                        onChange={() => setGalleryName("foe")}
                        />
                </Form.Group>
            </Form.Row>
            {props.endpoint === 'enroll' ?
            <Form.Row className="text-left">
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Subject name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </Form.Group>
            </Form.Row>
            : null
            }
            <Form.Row>
                <div className="input-group d-flex justify-content-center mb-3">
                    <div className="input-group-prepend">
                        <Button type="submit" variant="primary">Upload</Button>
                    </div>
                    <div className={props.type === 'file' ? "custom-file" : ''}>
                        <label className={props.type === 'file' ? "custom-file-label text-left" : 'text-center'}>{!file ? props.label : file.name}</label>
                        <input 
                            required
                            type={props.type}
                            className={props.type === 'file' ? "custom-file-input" : "form-control"}
                            placeholder={props.placeholder}
                            onChange={(e) => fileStaging(e)}
                            />
                    </div>
                </div>
            </Form.Row>
            <h2>Image Preview</h2>
            {fileSrc ? <figure><img className={classes.Image} alt="" src={fileSrc} /></figure> : <p style={{ color: "#CCC" }}>No image to preview</p>}
        </Form>
    )
}
export default ImageUploadForm