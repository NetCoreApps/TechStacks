using ServiceStack;
using ServiceStack.FluentValidation;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface.Validations;

public class CreateTechStackValidator : AbstractValidator<CreateTechnologyStack>
{
    public CreateTechStackValidator()
    {
        RuleSet(ApplyTo.Post, () =>
        {
            RuleFor(x => x.Name).RequiredName();
            RuleFor(x => x.Slug).RequiredSlug();
            RuleFor(x => x.VendorName).RequiredName();
            RuleFor(x => x.AppUrl).RequiredUrl();
            RuleFor(x => x.Description).RequiredDescription();
            RuleFor(x => x.Details).OptionalContent();
        });
    }
}

public class UpdateTechStackValidator : AbstractValidator<UpdateTechnologyStack>
{
    public UpdateTechStackValidator()
    {
        RuleSet(ApplyTo.Put, () =>
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Name).RequiredName();
            RuleFor(x => x.VendorName).RequiredName();
            RuleFor(x => x.AppUrl).RequiredUrl();
            RuleFor(x => x.Description).RequiredDescription();
            RuleFor(x => x.Details).OptionalContent();
        });
    }
}