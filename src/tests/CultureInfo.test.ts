import { ok, strictEqual } from "assert";
import { CultureInfo } from "../CultureInfo";
import { TestCultureInfo } from "./TestCultureInfo";

/**
 * Registers tests for the {@link CultureInfo `CultureInfo`} class.
 */
export function CultureInfoTests(): void
{
    suite(
        nameof(CultureInfo),
        () =>
        {
            suite(
                nameof(CultureInfo.constructor),
                () =>
                {
                    test(
                        "Checking whether the letter-casing of the culture-names are converted correctly…",
                        () =>
                        {
                            strictEqual(new CultureInfo("En-uS").Name, "en-US");
                            strictEqual(new CultureInfo("DE-Ch").Name, "de-CH");
                            strictEqual(new CultureInfo("Zh-HanS").Name, "zh-Hans");
                            strictEqual(new CultureInfo("zH-hAnS-cn").Name, "zh-Hans-CN");
                        });

                    test(
                        "Checking whether culture-names are interpreted correctly…",
                        () =>
                        {
                            let language = "zh";
                            let script = "Hans";
                            let region = "CN";
                            let languageOnly = new TestCultureInfo(language);
                            let languageAndRegion = new TestCultureInfo(`${language}-${region}`);
                            let languageAndScript = new TestCultureInfo("zh-Hans");
                            let fullyQualified = new TestCultureInfo("zh-Hans-CN");

                            strictEqual(languageOnly.Language, language);
                            strictEqual(languageOnly.Script, null);
                            strictEqual(languageOnly.Region, null);
                            strictEqual(languageAndRegion.Language, language);
                            strictEqual(languageAndRegion.Script, null);
                            strictEqual(languageAndRegion.Region, region);
                            strictEqual(languageAndScript.Language, language);
                            strictEqual(languageAndScript.Script, script);
                            strictEqual(languageAndScript.Region, null);
                            strictEqual(fullyQualified.Language, language);
                            strictEqual(fullyQualified.Script, script);
                            strictEqual(fullyQualified.Region, region);
                        });
                });

            suite(
                nameof<CultureInfo>((culture) => culture.Parent),
                () =>
                {
                    test(
                        "Checking whether parents are determined correctly…",
                        () =>
                        {
                            strictEqual(new CultureInfo("de-CH").Parent.Name, "de");
                            strictEqual(new CultureInfo("en-GB").Parent.Name, "en");
                            strictEqual(new CultureInfo("zh-Hans-CN").Parent.Name, "zh-Hans");
                            strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Name, "zh");
                        });
                });

            suite(
                nameof<CultureInfo>((culture) => culture.toString),
                () =>
                {
                    test(
                        `Checking whether \`${nameof(CultureInfo)}\`s are converted to \`${nameof(String)}\` correctly…`,
                        () =>
                        {
                            strictEqual(new CultureInfo("en-US").toString(), "en-US");
                            strictEqual(`${new CultureInfo("de-CH")}`, "de-CH");
                        });
                });

            suite(
                nameof<CultureInfo>((culture) => culture.IsNeutralCulture),
                () =>
                {
                    test(
                        `Checking whether \`${nameof<CultureInfo>((c) => c.IsNeutralCulture)}\` acts as expected…`,
                        () =>
                        {
                            ok(!new CultureInfo("de-CH").IsNeutralCulture);
                            ok(new CultureInfo("de-CH").Parent.IsNeutralCulture);
                            ok(!new CultureInfo("zh-Hans-CN").IsNeutralCulture);
                            ok(new CultureInfo("zh-Hans-CN").Parent.IsNeutralCulture);
                            ok(new CultureInfo("zh-Hans-CN").Parent.Parent.IsNeutralCulture);
                            ok(CultureInfo.InvariantCulture.IsNeutralCulture);
                        });
                });

            suite(
                nameof(CultureInfo.InvariantCulture),
                () =>
                {
                    test(
                        "Checking the integrity of the invariant culture…",
                        () =>
                        {
                            strictEqual(CultureInfo.InvariantCulture.Name, "");
                            strictEqual(CultureInfo.InvariantCulture.toString(), "");
                            strictEqual(new CultureInfo("de").Parent, CultureInfo.InvariantCulture);
                            strictEqual(new CultureInfo("zh-Hans-CN").Parent.Parent.Parent, CultureInfo.InvariantCulture);
                            strictEqual(CultureInfo.InvariantCulture, CultureInfo.InvariantCulture.Parent);
                        });
                });
        });
}
