using System;

namespace TechStacks.ServiceInterface.Validations
{
    public static class ValidatorUtils
    {
        public const string NotOnlyNumbersPattern = "(?!^\\d+$)^.+$"; //http://stackoverflow.com/a/3831442/670151
        public const string InvalidName = "Invalid Name";

        public static bool IsValidUrl(string arg) => Uri.TryCreate(arg, UriKind.Absolute, out _);
        public const string InvalidUrl = "Invalid URL";
    }
}