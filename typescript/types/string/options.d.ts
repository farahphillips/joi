export interface Base64Options {
    /**
     * optional parameter defaulting to true which will require = padding if true or make padding optional if false
     */
    paddingRequired?: boolean;
}

export interface EmailOptions {
    /**
     * Numerical threshold at which an email address is considered invalid
     */
    errorLevel?: number | boolean;
    /**
     * Specifies a list of acceptable TLDs.
     */
    tldWhitelist?: string[] | object;
    /**
     * Number of atoms required for the domain. Be careful since some domains, such as io, directly allow email.
     */
    minDomainAtoms?: number;
}

export interface HexOptions {
    /**
     * hex decoded representation must be byte aligned
     */
    byteAligned: boolean;
}

export interface IpOptions {
    /**
     * One or more IP address versions to validate against. Valid values: ipv4, ipv6, ipvfuture
     */
    version?: string | string[];
    /**
     * Used to determine if a CIDR is allowed or not. Valid values: optional, required, forbidden
     */
    cidr?: string;
}

export interface StringRegexOptions {
    name?: string;
    invert?: boolean;
}

export type GuidVersions = 'uuidv1' | 'uuidv2' | 'uuidv3' | 'uuidv4' | 'uuidv5';

export interface GuidOptions {
    version: GuidVersions[] | GuidVersions;
}

export interface UriOptions {
    /**
     * Specifies one or more acceptable Schemes, should only include the scheme name.
     * Can be an Array or String (strings are automatically escaped for use in a Regular Expression).
     */
    scheme?: string | RegExp | Array<string | RegExp>;
    /**
     * Allow relative URIs. Defaults to `false`.
     */
    allowRelative?: boolean;
    /**
     * Restrict only relative URIs. Defaults to `false`.
     */
    relativeOnly?: boolean;
}

export interface DataUriOptions {
    /**
     * optional parameter defaulting to true which will require = padding if true or make padding optional if false
     */
    paddingRequired?: boolean;
}
