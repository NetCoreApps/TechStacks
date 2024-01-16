using ServiceStack;
using ServiceStack.FluentValidation;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface.Validations;

public class CreateOrganizationValidator : AbstractValidator<CreateOrganization>
{
    public CreateOrganizationValidator()
    {
        RuleSet(ApplyTo.Post, () =>
        {
            RuleFor(x => x.Name).RequiredName();
            RuleFor(x => x.Slug).RequiredSlug();
            RuleFor(x => x.Description).OptionalDescription();
        });
    }
}

public class UpdateOrganizationValidator : AbstractValidator<UpdateOrganization>
{
    public UpdateOrganizationValidator()
    {
        RuleSet(ApplyTo.Put, () =>
        {
            RuleFor(x => x.Name).RequiredName();
            RuleFor(x => x.Slug).RequiredSlug();
            RuleFor(x => x.Description).OptionalDescription();
            RuleFor(x => x.DeletePostsWithReportCount).GreaterThan(0);
        });
    }
}

public class AddOrganizationCategoryValidator : AbstractValidator<AddOrganizationCategory>
{
    public AddOrganizationCategoryValidator() => RuleSet(ApplyTo.Post, () => {
        RuleFor(x => x.Name).RequiredName();
        RuleFor(x => x.Slug).RequiredSlug();
    });
}

public class UpdateOrganizationCategoryValidator : AbstractValidator<UpdateOrganizationCategory>
{
    public UpdateOrganizationCategoryValidator() => RuleSet(ApplyTo.Put, () => {
        RuleFor(x => x.Name).RequiredName();
        RuleFor(x => x.Slug).RequiredSlug();
    });
}