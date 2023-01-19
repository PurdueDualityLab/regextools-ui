
/**
 * Represents a line in a file hosted on a remote repository source
 */
export interface RemoteSourceLoc {
    lineNo: number;
    repo: string;
    file: string;
    commit: string;
}

/**
 * Raw data model
 */
export interface RawRegexEntity {
    pattern: string;
    license: string;
    line_no: number;
    repo_location: string;
    file: string;
    commit: string;
}

/**
 * A full regex entity
 */
export interface RegexEntity {
    pattern: string;
    license: string;
    location: RemoteSourceLoc;
}

export const createRegexEntity = (rawEntity: RawRegexEntity): RegexEntity => ({
    pattern: rawEntity.pattern,
    license: rawEntity.license,
    location: {
        file: rawEntity.file,
        repo: rawEntity.repo_location,
        lineNo: rawEntity.line_no,
        commit: rawEntity.commit,
    }
});
