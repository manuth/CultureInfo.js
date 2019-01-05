import Assert = require("assert");
import { CultureInfo } from "..";

suite("CultureInfo", () =>
{
    test(
        "Checking whether the case of the case of cultures are converted correctly...",
        () =>
        {
            Assert.strictEqual(new CultureInfo("En-uS").Name, "en-US");
            Assert.strictEqual(new CultureInfo("DE-Ch").Name, "de-CH");
            Assert.strictEqual(new CultureInfo("zH-hAnS-cn").Name, "zh-Hans-CN");
        });

    test(
        "Checking whether parents are determined correctly...",
        () =>
        {
            Assert.strictEqual(new CultureInfo("de-CH").Parent.Name, "de");
            Assert.strictEqual(new CultureInfo("en-GB").Parent.Name, "en");
            Assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Name, "zh-Hans");
            Assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Name, "zh");
        });

    test(
        "Checking \"CultureInfo to string\"-conversion...",
        () =>
        {
            Assert.strictEqual(new CultureInfo("en-US").toString(), "en-US");
            Assert.strictEqual(new CultureInfo("de-CH").toString(), "de-CH");
            Assert.strictEqual(new CultureInfo("zh-Hans-CN").toString(), "zh-Hans-CN");
        });

    test(
        "Checking the integrity of the IsNeutralCulture-property...",
        () =>
        {
            Assert.strictEqual(new CultureInfo("de-CH").IsNeutralCulture, false);
            Assert.strictEqual(new CultureInfo("de-CH").Parent.IsNeutralCulture, true);
            Assert.strictEqual(new CultureInfo("zh-Hans-CN").IsNeutralCulture, false);
            Assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.IsNeutralCulture, true);
        });

    test(
        "Checking the integrity of the invariant culture...",
        () =>
        {
            Assert.strictEqual(CultureInfo.InvariantCulture.Name, "");
            Assert.strictEqual(CultureInfo.InvariantCulture.toString(), "");
            Assert.strictEqual(new CultureInfo("de").Parent, CultureInfo.InvariantCulture);
            Assert.strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Parent, CultureInfo.InvariantCulture);
        });
});