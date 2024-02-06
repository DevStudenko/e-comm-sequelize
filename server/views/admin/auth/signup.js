const layout = require('../layout');
module.exports = ({ req }) => {
    return layout({
        content: `
<div>
    Your id is:${req.session.userId}
    <form action="/signup" method="POST">
        <div>
            <input type="email" name="email" placeholder="Email">
        </div>
        <div>
            <input type="password" name="password" placeholder="Password">
        </div>
        <div>
            <input type="password" name="passwordConfirmation" placeholder="Password Confirmation">
        </div>
        <div>
            <button type="submit">Register</button>
        </div>
    </form>
</div>`
    });
};