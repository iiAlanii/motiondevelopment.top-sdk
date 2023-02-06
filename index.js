const AutoPoster = require('./AutoPoster');
const VoteGetter = require('./VoteGetter');
const InfoGetter = require('./InfoGetter');
const Repo = require("npm-api/lib/models/repo");
let version = require('./package.json').version;
const repo = new Repo("motiondevelopment.top-sdk");

repo.package()
    .then(function (pkg) {
        if (version === pkg.version) return;
        else console.log(`[MotionDevelopment.top-sdk]: There is a new Update! Please do:\n
npm update motiondevelopment.top-sdk\n
to see the new features!\n
Update:
${pkg.version} - ${pkg.description}`)
    }, function (err) {
        console.error(err);
    });

module.exports = {
    AutoPoster,
    VoteGetter,
    InfoGetter
};

