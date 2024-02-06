const layout = require('../layout');

module.exports = ({ req }) => {
    return layout({
        content: `
<div>
    <form action="/signin" method="POST">
        <div>
            <input type="email" name="email" placeholder="Email">
        </div>
        <div>
            <input type="password" name="password" placeholder="Password">
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
    </form>
</div>`
    });
};