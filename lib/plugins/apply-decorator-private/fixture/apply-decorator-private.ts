export class GithubService {
    constructor(
        private readonly @Inject('OCTOKIT') octokit: Octokit
    ) {}
}