/* This file  */
import * as assert from 'assert';
import * as cultureinfo from '../main';

describe("CultureInfo", () =>
{
    it('Checking the output of `Example`... (Excepting `true`)', () =>
    {
        assert.strictEqual(cultureinfo.Example(), true);
    });
});