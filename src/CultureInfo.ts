/**
 * Provides information about a specific culture (called a locale for unmanaged code development).
 */
export class CultureInfo
{
    /**
     * The invariant culture.
     */
    private static invariantCulture: CultureInfo;

    /**
     * The language of the culture.
     */
    private language: string;

    /**
     * The script of the culture.
     */
    private script: string = null;

    /**
     * The region of the culture.
     */
    private region: string = null;

    /**
     * Initializes a new instance of the {@link CultureInfo `CultureInfo`} class.
     *
     * @param name
     * A predefined {@link CultureInfo `CultureInfo`} name, `Name` of an existing {@link CultureInfo `CultureInfo`}.
     * {@link name `name`} is not case-sensitive.
     */
    public constructor(name: string)
    {
        let result = /^(?:(\w{2})(?:[-_](\w{4}))?(?:[-_](\w{2}))?)?$/g.exec(name);

        if (result === null)
        {
            throw new RangeError("Invalid language-tag.");
        }
        else if (result[0].length === 0)
        {
            this.language = "";
        }
        else
        {
            this.language = result[1].toLowerCase();

            if (result[2])
            {
                this.script = result[2].charAt(0).toUpperCase() + result[2].slice(1).toLocaleLowerCase();
            }

            if (result[3])
            {
                this.region = result[3].toUpperCase();
            }
        }
    }

    /**
     * Gets the {@link CultureInfo `CultureInfo`} object that is culture-independent (invariant).
     */
    public static get InvariantCulture(): CultureInfo
    {
        if (!CultureInfo.invariantCulture)
        {
            CultureInfo.invariantCulture = new CultureInfo("");
        }

        return CultureInfo.invariantCulture;
    }

    /**
     * Gets a value indicating whether the current {@link CultureInfo `CultureInfo`} represents a neutral culture.
     */
    public get IsNeutralCulture(): boolean
    {
        return !this.region && !this.script;
    }

    /**
     * Gets the culture name.
     */
    public get Name(): string
    {
        let result = this.language;

        if (this.script)
        {
            result += "-" + this.script;
        }

        if (this.region)
        {
            result += "-" + this.region;
        }

        return result;
    }

    /**
     * Gets the {@link CultureInfo `CultureInfo`} that represents the parent culture of the current {@link CultureInfo `CultureInfo`}.
     */
    public get Parent(): CultureInfo
    {
        if (this.IsNeutralCulture || this === CultureInfo.InvariantCulture)
        {
            return CultureInfo.InvariantCulture;
        }
        else
        {
            let nameParts = this.Name.split("-");
            return new CultureInfo(nameParts.slice(0, nameParts.length - 1).join("-"));
        }
    }

    /**
     * Returns a string which represents the object.
     *
     * @returns
     * A string which represents the object.
     */
    public toString(): string
    {
        return this.Name;
    }

    /**
     * Returns the primitive value of the object.
     *
     * @returns
     * The primitive value of the object.
     */
    public valueOf(): any
    {
        return this.Name;
    }
}
