const actions = require('@actions/actions');
const octokit = require('@actions/github');

const listToArray = (str) => {
  const arr = str.split(',');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }
  return arr;
};

(async () => {

  try {

    const rtrue = { required: true };
    const token = actions.getInput('token', rtrue);
    actions.debug(`Using token: ${token}`);

    const repoContext = octokit.context.repo;
    const owner = actions.getInput('owner') || repoContext.owner;
    const repo = actions.getInput('repo') || repoContext.repo;
    const title = actions.getInput('title', rtrue);
    actions.debug(`Using owner: ${owner}`);
    actions.debug(`Using repo: ${repo}`);
    actions.debug(`Using title: ${title}`);

    const body = actions.getInput('body');
    const milestone = actions.getInput('milestone');
    const labels = actions.getInput('labels');
    const assignees = actions.getInput('assignees');
    actions.debug(`Using body: """${body}"""`);
    actions.debug(`Using milestone: ${milestone}`);
    actions.debug(`Using labels: ${labels}`);
    actions.debug(`Using assignees: ${assignees}`);

    const octokit = octokit.getOctokit(token);
    const opts = Object.fromEntries(Object.entries({
      owner,
      repo,
      title,
      body: body == '' ? null : body,
      milestone: milestone == '' ? null : milestone,
      labels: labels ? listToArray(labels) : null,
      assignees: assignees ? listToArray(assignees) : null
    }).filter(([_, v]) => v != null));
    actions.debug(`Object for new issue: """${JSON.stringify(opts, null, 2)}"""`)
    const newIssue = await octokit.rest.issues.create(opts);
    actions.info(`Created: ${newIssue.data.html_url}`)
    actions.setOutput("JSON", JSON.stringify(newIssue.data));
    actions.setOutput("NUMBER", newIssue.data.number);
    actions.setOutput("URL", newIssue.data.html_url);
  } catch (err) {
    actions.error(err);
    actions.setFailed('Request to create new issue failed');
  }
})();
