/**
 * Provides information about a specific culture (called a locale for unmanaged code development).
 */
export default class  CultureInfo
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
     * Initializes a new instance of the `CultureInfo` class.
     *
     * @param name
     * A predefined `CultureInfo` name, `Name` of an existing `CultureInfo`. `name` is not case-sensitive.
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
     * Gets the `CultureInfo` object that is culture-independent (invariant).
     */
    public static get InvariantCulture(): CultureInfo
    {
        if (!this.invariantCulture)
        {
            this.invariantCulture = new CultureInfo("");
        }

        return this.invariantCulture;
    }

    /**
     * Gets a value indicating whether the current `CultureInfo` represents a neutral culture.
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
     * Gets the `CultureInfo` that represents the parent culture of the current `CultureInfo`.
     */
    public get Parent(): CultureInfo
    {
        let nameParts = this.Name.split("-");

        if (this.IsNeutralCulture || this.Name === CultureInfo.InvariantCulture.Name)
        {
            return CultureInfo.InvariantCulture;
        }
        else
        {
            return new CultureInfo(nameParts.slice(0, nameParts.length - 1).join("-"));
        }
    }

    /**
     * Returns a string which represents the object.
     */
    public toString()
    {
        return this.Name;
    }

    /**
     * Returns the primitive value of the object.
     */
    public valueOf(): any
    {
        return this.Name as any;
    }
}