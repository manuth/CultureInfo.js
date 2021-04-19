import { strictEqual } from "assert";
import { CultureInfo } from "..";

suite(
    "CultureInfo.js", () =>
    {
        test(
            "Checking whether the case of the case of cultures are converted correctly...",
            () =>
            {
                strictEqual(new CultureInfo("En-uS").Name, "en-US");
                strictEqual(new CultureInfo("DE-Ch").Name, "de-CH");
                strictEqual(new CultureInfo("zH-hAnS-cn").Name, "zh-Hans-CN");
            });

        test(
            "Checking whether parents are determined correctly...",
            () =>
            {
                strictEqual(new CultureInfo("de-CH").Parent.Name, "de");
                strictEqual(new CultureInfo("en-GB").Parent.Name, "en");
                strictEqual(new CultureInfo("zh-Hans-CN").Parent.Name, "zh-Hans");
                strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Name, "zh");
            });

        test(
            "Checking \"CultureInfo to string\"-conversion...",
            () =>
            {
                strictEqual(new CultureInfo("en-US").toString(), "en-US");
                strictEqual(new CultureInfo("de-CH").toString(), "de-CH");
                strictEqual(new CultureInfo("zh-Hans-CN").toString(), "zh-Hans-CN");
            });

        test(
            "Checking the integrity of the IsNeutralCulture-property...",
            () =>
            {
                strictEqual(new CultureInfo("de-CH").IsNeutralCulture, false);
                strictEqual(new CultureInfo("de-CH").Parent.IsNeutralCulture, true);
                strictEqual(new CultureInfo("zh-Hans-CN").IsNeutralCulture, false);
                strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.IsNeutralCulture, true);
            });

        test(
            "Checking the integrity of the invariant culture...",
            () =>
            {
                strictEqual(CultureInfo.InvariantCulture.Name, "");
                strictEqual(CultureInfo.InvariantCulture.toString(), "");
                strictEqual(new CultureInfo("de").Parent, CultureInfo.InvariantCulture);
                strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Parent, CultureInfo.InvariantCulture);
            });
    });
