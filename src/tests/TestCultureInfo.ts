import { CultureInfo } from "../CultureInfo.js";

/**
 * Provides an implementation of the {@link CultureInfo `CultureInfo`} class for testing.
 */
export class TestCultureInfo extends CultureInfo
{
    /**
     * Initializes a new instance of the {@link CultureInfo `CultureInfo`} class.
     *
     * @param name
     * A non case-sensitive predefined {@link CultureInfo `CultureInfo`} name.
     */
    public constructor(name: string)
    {
        super(name);
    }

    /**
     * @inheritdoc
     */
    public override get Language(): string
    {
        return super.Language;
    }

    /**
     * @inheritdoc
     */
    public override set Language(value: string)
    {
        super.Language = value;
    }

    /**
     * @inheritdoc
     */
    public override get Script(): string
    {
        return super.Script;
    }

    /**
     * @inheritdoc
     */
    public override set Script(value: string)
    {
        super.Script = value;
    }

    /**
     * @inheritdoc
     */
    public override get Region(): string
    {
        return super.Region;
    }

    /**
     * @inheritdoc
     */
    public override set Region(value: string)
    {
        super.Region = value;
    }
}
