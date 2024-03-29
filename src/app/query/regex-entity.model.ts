
/**
 * Represents a line in a file hosted on a remote repository source
 */
export interface RemoteSourceLoc {
    lineNumber: number;
    repoLocation: string;
    sourceFile: string;
    commit: string;
    license: string;
}

export interface ForumLoc {
    type: string;
    uri: string;
}

/**
 * A full regex entity
 */
export interface RegexEntity {
    id: string;
    pattern: string;
    sourceLocations: RemoteSourceLoc[];
    forumLocations: ForumLoc[];
}
