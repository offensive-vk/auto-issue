# auto-issue@master

The Action creates an issue on GitHub Repository.

```yml
steps:
  - uses: actions/checkout@v4
  - name: Create an Issue
    uses: offensive-vk/auto-issue@master
    with:
      token: ${{ github.token }}
      title: Issue Created
      body: This is a test issue
```

## Configure Inputs through `with:`

| Option  | Default Value  | Notes  |
| ------------ | ------------ | ------------ |
| token      | github.token / `required`  | Use `${{ github.token }}` (same as `${{secrets.GITHUB_TOKEN}}`) or create a PAT stored in the secrets store.   |
| owner      | github.context.repo.owner  | The owner of the repo to make the issue on. Implied from the context of the running action.  |
| repo       | github.context.repo.repo   | The repo to make the issue on. Implied from the context of the running action.  |
| title      | `required`                 |   |
| body       |                            |   |
| milestone  |                            |   |
| labels     |                            | A comma seperated list of labels  |
| assignees  |                            | A comma seperated list of GitHub usernames to assign the issue to  |

### Outputs

| output | value |
| ------ | ----- |
| JSON | [See Response](https://docs.github.com/en/rest/issues/issues#create-an-issue) |
| URL | the issue's web url |
| NUMBER | the issue's number |

## Usage

> [!NOTE]
> This Action only supports `ubuntu-latest` runners.

### Advanced Workflow

```yml
name: Dangerous Workflow
...

jobs:
  job-that-might-fail:
    ...

  create-issue-if-job-fails:
    needs: job-that-might-fail
    runs-on: ubuntu-latest
    if: always() && needs.job-that-might-fail.result == 'failure'
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
    
      - name: Create Issue
        uses: offensive-vk/create-issue-action@master
        with:
          token: ${{ github.token }}
          title: |
            [${{ github.workflow }}] failed during [${{ github.event_name }}]

          # Auto-assign person who triggered the failure.
          assignees: ${{ github.actor }},${{ github.triggering_actor }}
          labels: ci/cd
          body: |
            ## Failure Report:
            
            > [!IMPORTANT]
            > Details on failed run: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
    
            - Author: @${{ github.triggering_actor }}
            - Branch: `${{ github.ref }}`
            - Commit: ${{ github.sha }}
            - Workflow Path: `${{ github.workflow_ref }}`
    
            - [ ] **Task**: Review failed run, fix the issue(s), and re-run until successful.
    
            > This issue was created automatically by GitHub Actions, 
            > through `offensive-vk/create-issue-action@master` action
            > **DO NOT** close this issue until resolved.
```

### Using Outputs

```yml
...
steps:
  - uses: actions/checkout@v4
  - uses: offensive-vk/create-issue-action@master
    id: new-issue
    with:
      token: ${{ github.token }}
      title: Simple test issue
      body: my new issue
  - run: |
      echo "${{ steps.new-issue.outputs.json }}" | jq
      echo "${{ steps.new-issue.outputs.json }}" | jq .state
      echo "${{ steps.new-issue.outputs.json }}" | jq .labels[].name
```

***

<p align="center">
  <i>&copy; <a href="https://github.com/offensive-vk/">Vedansh </a> 2020 - Present</i><br>
  <i>Licensed under <a href="https://github.com/offensive-vk/auto-issue?tab=MIT-1-ov-file">MIT</a></i><br>
  <a href="https://github.com/TheHamsterBot"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" alt="hamster"/></a><br>
  <sup>Thanks for visiting :)</sup>
</p>
