using ServiceStack;
using ServiceStack.FluentValidation;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface.Validations
{
    public class CreateOrganizationValidator : AbstractValidator<CreateOrganization>
    {
        public CreateOrganizationValidator()
        {
            RuleSet(ApplyTo.Post, () =>
            {
                RuleFor(x => x.Name).RequiredName();
                RuleFor(x => x.Slug).RequiredSlug();
                RuleFor(x => x.Description).OptionalSummary();
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
                RuleFor(x => x.Description).OptionalSummary();
            });
        }
    }
}