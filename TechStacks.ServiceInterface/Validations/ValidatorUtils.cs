using System;
using ServiceStack.FluentValidation;

namespace TechStacks.ServiceInterface.Validations;

public static class ValidatorUtils
{
    public static int NameMaxLength = 50;
    public static int SlugMaxLength = 50;
    public static int UrlMaxLength = 200;
    public static int TitleMaxLength = 140;
    public static int SummaryMaxLength = 140;
    public static int DescriptionMaxLength = 740;
    public static int ContentMaxLength = 128000;

    public static string NotOnlyNumbersPattern = "(?!^\\d+$)^.+$"; //http://stackoverflow.com/a/3831442/670151
    public static string AllowedNameCharsPattern = "[a-zA-Z0-9,.;:_!/'\\s\\-\\,]";
    public static string AllowedSlugCharsPattern = "[a-z0-9\\-]";

    public static bool IsValidUrl(string arg) => Uri.TryCreate(arg, UriKind.Absolute, out _);
    public static string InvalidUrlMessage = "Invalid URL";

    public static IRuleBuilderOptions<T, string> RequiredSlug<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .NotEmpty()
            .Length(0, SlugMaxLength)
            .Matches(AllowedSlugCharsPattern);
    }

    public static IRuleBuilderOptions<T, string> RequiredName<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .NotEmpty()
            .Length(0, NameMaxLength)
            .Matches(NotOnlyNumbersPattern)
            .Matches(AllowedNameCharsPattern);
    }

    public static IRuleBuilderOptions<T, string> RequiredTitle<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .NotEmpty()
            .Length(0, TitleMaxLength)
            .Matches(NotOnlyNumbersPattern);
    }

    public static IRuleBuilderOptions<T, string> RequiredDescription<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .NotEmpty()
            .Length(0, DescriptionMaxLength);
    }

    public static IRuleBuilderOptions<T, string> OptionalDescription<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .Length(0, DescriptionMaxLength);
    }

    public static IRuleBuilderOptions<T, string> RequiredSummary<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .NotEmpty()
            .Length(0, SummaryMaxLength);
    }

    public static IRuleBuilderOptions<T, string> OptionalSummary<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .Length(0, SummaryMaxLength);
    }

    public static IRuleBuilderOptions<T, string> RequiredContent<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .NotEmpty()
            .Length(0, ContentMaxLength);
    }

    public static IRuleBuilderOptions<T, string> OptionalContent<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .Length(0, ContentMaxLength);
    }

    public static IRuleBuilderOptions<T, string> OptionalUrl<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .Length(0, UrlMaxLength)
            .Must(IsValidUrl)
            .When(x => !string.IsNullOrEmpty(x as string))
            .WithMessage(InvalidUrlMessage);
    }

    public static IRuleBuilderOptions<T, string> RequiredUrl<T>(this IRuleBuilderInitial<T, string> propertyRule)
    {
        return propertyRule
            .NotEmpty()
            .Length(0, UrlMaxLength)
            .Must(IsValidUrl)
            .WithMessage(InvalidUrlMessage);
    }
}