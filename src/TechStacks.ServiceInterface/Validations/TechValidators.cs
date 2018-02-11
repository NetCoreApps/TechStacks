using ServiceStack;
using ServiceStack.FluentValidation;
using TechStacks.ServiceModel;

namespace TechStacks.ServiceInterface.Validations
{
    public class CreateTechValidator : AbstractValidator<CreateTechnology>
    {
        public CreateTechValidator()
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

                RuleFor(x => x.ProductUrl)
                    .NotEmpty()
                    .Length(1, 200)
                    .Must(ValidatorUtils.IsValidUrl)
                    .WithMessage(ValidatorUtils.InvalidUrl);

                RuleFor(x => x.Description)
                    .NotEmpty()
                    .Length(50, 740);
            });
        }
    }

    public class UpdateTechValidator : AbstractValidator<UpdateTechnology>
    {
        public UpdateTechValidator()
        {
            RuleSet(ApplyTo.Put, () =>
            {
                RuleFor(x => x.Id)
                    .GreaterThan(0);

                RuleFor(x => x.Name)
                    .NotEmpty()
                    .Length(1, 50)
                    .Matches(ValidatorUtils.NotOnlyNumbersPattern)
                    .WithMessage(ValidatorUtils.InvalidName);

                RuleFor(x => x.VendorName)
                    .NotEmpty()
                    .Length(1, 50);

                RuleFor(x => x.ProductUrl)
                    .NotEmpty()
                    .Length(1, 200)
                    .Must(ValidatorUtils.IsValidUrl)
                    .WithMessage(ValidatorUtils.InvalidUrl);

                RuleFor(x => x.Description)
                    .NotEmpty()
                    .Length(50, 740);
            });
        }
    }
}
