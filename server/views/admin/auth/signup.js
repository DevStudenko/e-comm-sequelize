const layout = require('../layout');

const getError = (errors, prop) => {
    //prop === 'email' || 'password', || 'passwordConformation
    try {
        return errors.mapped()[prop].msg
    } catch (err) {
        return '';
    }
};


module.exports = ({ req, errors }) => {
    return layout({
        content: `
<div>
    Your id is:${req.session.userId}
    <form action="/signup" method="POST">
        <div>
            <input name="email" placeholder="Email">
        </div>
        ${getError(errors, 'email')}
        <div>
            <input name="password" placeholder="Password">
        </div>
        ${getError(errors, 'password')}
        <div>
            <input name="passwordConfirmation" placeholder="Password Confirmation">
        </div>
        ${getError(errors, 'passwordConfirmation')}
        <div>
            <button type="submit">Register</button>
        </div>
    </form>
</div>`
    });
};