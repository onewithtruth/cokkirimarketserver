
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
};
