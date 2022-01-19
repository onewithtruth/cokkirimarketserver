
module.exports = {
    get: (req, res) => {
        res.status(200).send('GET: /post')
    },
    
    post: (req, res) => {
        res.status(200).send('POST: /post')
    },

    my: (req, res) => {
        res.status(200).send('POST: /my')
    },

    signin: (req, res) => {
        const body = req.body
        res.status(200).send('POST: /user/signin, body : ', body)
    },
};
