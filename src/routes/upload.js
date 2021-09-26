const router = require('express').Router();
const axios = require("axios");
const headers = {
    "content-type":"application/json",
    "x-rapidapi-host":"kairosapi-karios-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.KAIROS_API_KEY,
    "accept":"application/json"
}
const baseUrl = "https://kairosapi-karios-v1.p.rapidapi.com/"
router.route('/enroll').post( async (req, res) => {
    let data = {
        ...req.body
    }
    const url = baseUrl + "enroll"
    try {
        const response = await axios({ 
            "method": "POST",
            url,
            headers,
            data
        })
        const params = Object.keys(response.data)
        
        // check for errors
        if (params.includes('Errors')) {
            console.log(response.data)
            return res.status(400).send({variant:"danger", text: response.data.Errors[0].Message})
        }
        // return a simple string if the add was successful
        res.send({variant:'success', text: `Success! ${data.subject_id} added.`})
    } catch(e) {
        console.log(e);
        res.status(500).send({variant: 'danger', text: 'Server error.'});
    }
})
router.route('/recognize').post( async (req, res) => {
    let data = {
        ...req.body
    }
    const url = baseUrl + "recognize"
    try {
        const response = await axios({ 
            "method": "POST",
            url,
            headers,
            data
        })
        const params = Object.keys(response.data)
        if (params.includes('Errors')) {
            return res.status(400).send({variant: "danger", text: response.data.Errors[0].Message})
        }
        let subjects = []
        // check the response for candidates
        response.data.images.map(item => {
            console.log(item)
            if (item.candidates) {
                subjects.push(item.candidates[0].subject_id)
            }
        })
        // build string responses that contain the subjects that were found, or not found in the image
        if (subjects.length < 1) {
            return res.send({variant: "info", text: "No faces were recognized. Exercise caution."})
        }
        if (data.gallery_name === 'foe') {
            const foeString = `Be careful we recognize ${subjects.join(' ')} as foe!`
            res.send({variant: 'danger', text: foeString})
        } else {
            const friendString = `Hoozah! We recognize friends! That's ${subjects.join(' and ')}`
            res.send({variant: 'success', text: friendString})
        }
    } catch(e) {
        console.log(e);
        res.status(500).send({variant: 'danger', text: 'Server error.'});
    }
})
module.exports = router;