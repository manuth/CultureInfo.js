import * as assert from "assert";
import { CultureInfo } from "../main";

suite("CultureInfo", () =>
{
    test(
        "Checking whether the case of the case of cultures are converted correctly...",
        () =>
        {
            assert.strictEqual(new CultureInfo("En-uS").Name, "en-US");
            assert.strictEqual(new CultureInfo("DE-Ch").Name, "de-CH");
            assert.strictEqual(new CultureInfo("zH-hAnS-cn").Name, "zh-Hans-CN");
        });

    test(
        "Checking whether parents are determined correctly...",
        () =>
        {
            assert.strictEqual(new CultureInfo("de-CH").Parent.Name, "de");
            assert.strictEqual(new CultureInfo("en-GB").Parent.Name, "en");
            assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Name, "zh-Hans");
            assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Name, "zh");
        });

    test(
        "Checking \"CultureInfo to string\"-conversion...",
        () =>
        {
            assert.strictEqual(new CultureInfo("en-US").toString(), "en-US");
            assert.strictEqual(new CultureInfo("de-CH").toString(), "de-CH");
            assert.strictEqual(new CultureInfo("zh-Hans-CN").toString(), "zh-Hans-CN");
        });

    test(
        "Checking the integrity of the IsNeutralCulture-property...",
        () =>
        {
            assert.strictEqual(new CultureInfo("de-CH").IsNeutralCulture, false);
            assert.strictEqual(new CultureInfo("de-CH").Parent.IsNeutralCulture, true);
            assert.strictEqual(new CultureInfo("zh-Hans-CN").IsNeutralCulture, false);
            assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.IsNeutralCulture, true);
        });

    test(
        "Checking the integrity of the invariant culture...",
        () =>
        {
            assert.strictEqual(CultureInfo.InvariantCulture.Name, "");
            assert.strictEqual(CultureInfo.InvariantCulture.toString(), "");
            assert.strictEqual(new CultureInfo("de").Parent, CultureInfo.InvariantCulture);
            assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Parent, CultureInfo.InvariantCulture);
        });
});