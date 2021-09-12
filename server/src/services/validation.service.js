
const yupValidator = (schema) => async (req, res, next) => {

    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        console.log(error);
        res.status(400).send(error.toString());
    }

}

module.exports = yupValidator