using ServiceStack;
using ServiceStack.FluentValidation;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface.Validations;

public class CreateTechValidator : AbstractValidator<CreateTechnology>
{
    public CreateTechValidator()
    {
        RuleSet(ApplyTo.Post, () =>
        {
            RuleFor(x => x.Name).RequiredName();
            RuleFor(x => x.Slug).RequiredSlug();
            RuleFor(x => x.VendorName).RequiredName();
            RuleFor(x => x.ProductUrl).RequiredUrl();
            RuleFor(x => x.Description).RequiredDescription();
        });
    }
}

public class UpdateTechValidator : AbstractValidator<UpdateTechnology>
{
    public UpdateTechValidator()
    {
        RuleSet(ApplyTo.Put, () =>
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Name).RequiredName();
            RuleFor(x => x.VendorName).RequiredName();
            RuleFor(x => x.ProductUrl).RequiredUrl();
            RuleFor(x => x.Description).RequiredDescription();
        });
    }
}