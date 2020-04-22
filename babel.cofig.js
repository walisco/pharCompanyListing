// wdio.conf.js
exports.config = {
    // ...
    mochaOpts: {
        ui: 'bdd',
        require: 'ts-node/register',
        compilers: [
            // optional
            'tsconfig-paths/register'
        ]
    },
    // ...
}