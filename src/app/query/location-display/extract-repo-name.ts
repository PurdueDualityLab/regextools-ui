
export const extractRepoName = (githubURL: string): string => {
    const extractRegex = /^https?:\/\/(www\.)?github\.com\/(.*)$/;
    const results = extractRegex.exec(githubURL);
    if (results) {
        console.log(results);
        return results[2];
    } else {
        return githubURL;
    }
}
