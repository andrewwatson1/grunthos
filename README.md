# grunthos

## Deployment

### API

- Set server IP in `deployment/builders.ini`

```
[builders]
192.168.1.2
```

- Copy `api/sample.env` to `api/prod.env`, fill it and source it

- Run ansible playbook

```
ansible-playbook \
	--ssh-common-args "-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o ForwardAgent=yes" \
	-i builders.ini \
    -e "github_deployments_public_key=~/.ssh/github_deployments.pub" \
    -e "github_deployments_private_key=~/.ssh/github_deployments" \
    -e "bugout_reporter_token=$BUGOUT_REPORTER_TOKEN" \
    -e "bugout_poems_journal_id=$BUGOUT_POEMS_JOURNAL_ID" \
    -e "bugout_resource_application_id=$BUGOUT_RESOURCE_APPLICATION_ID" \
    -e "grunthos_server_id=$GRUNTHOS_SERVER_ID" \
    -e "grunthos_cors_allowed_origins=$GRUNTHOS_CORS_ALLOWED_ORIGINS" \
    -e "solana_config_path=$SOLANA_CONFIG_PATH" \
    -e "solana_cluster=$SOLANA_CLUSTER" \
    setup.yml
```
