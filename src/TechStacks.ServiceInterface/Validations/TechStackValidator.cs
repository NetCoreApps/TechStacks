using ServiceStack;
using ServiceStack.FluentValidation;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface.Validations
{
    public class TechStackValidator : AbstractValidator<CreateTechnologyStack>
    {
        public TechStackValidator()
        {
            RuleSet(ApplyTo.Post, () =>
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .Length(1, 50)
                    .Matches(ValidatorUtils.NotOnlyNumbersPattern)
                    .WithMessage(ValidatorUtils.InvalidName);

                RuleFor(x => x.VendorName)
                    .NotEmpty()
                    .Length(1, 50);

                RuleFor(x => x.AppUrl)
                    .NotEmpty()
                    .Length(1, 200)
                    .Must(ValidatorUtils.IsValidUrl)
                    .WithMessage(ValidatorUtils.InvalidUrl);

                RuleFor(x => x.Description)
                    .NotEmpty()
                    .Length(50, 740);

                RuleFor(x => x.Details)
                    .Length(0, 4000);
            });
        }
    }
}
