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
     * A non case-sensitive predefined {@link CultureInfo `CultureInfo`} name.
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
            this.Language = "";
        }
        else
        {
            this.Language = result[1].toLowerCase();

            if (result[2])
            {
                this.Script = result[2].charAt(0).toUpperCase() + result[2].slice(1).toLocaleLowerCase();
            }

            if (result[3])
            {
                this.Region = result[3].toUpperCase();
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
        return !this.Region;
    }

    /**
     * Gets the culture name.
     */
    public get Name(): string
    {
        let result = this.Language;

        if (this.Script)
        {
            result += "-" + this.Script;
        }

        if (this.Region)
        {
            result += "-" + this.Region;
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
     * Gets or sets the language of the culture.
     */
    protected get Language(): string
    {
        return this.language;
    }

    /**
     * @inheritdoc
     */
    protected set Language(value: string)
    {
        this.language = value;
    }

    /**
     * Gets or sets the script of the culture.
     */
    protected get Script(): string
    {
        return this.script;
    }

    /**
     * @inheritdoc
     */
    protected set Script(value: string)
    {
        this.script = value;
    }

    /**
     * Gets or sets the region of the culture.
     */
    protected get Region(): string
    {
        return this.region;
    }

    /**
     * @inheritdoc
     */
    protected set Region(value: string)
    {
        this.region = value;
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
