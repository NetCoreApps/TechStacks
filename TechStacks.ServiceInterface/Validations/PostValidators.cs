using ServiceStack;
using ServiceStack.FluentValidation;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Validations;

public class CreatePostValidator : AbstractValidator<CreatePost>
{
    public CreatePostValidator()
    {
        RuleSet(ApplyTo.Post, () =>
        {
            RuleFor(x => x.Title).RequiredTitle();
            RuleFor(x => x.Url).OptionalUrl();
            RuleFor(x => x.Content).OptionalContent();

            RuleFor(x => x.Url)
                .NotEmpty()
                .When(x => string.IsNullOrEmpty(x.Content) && string.IsNullOrEmpty(x.ImageUrl) && Request.Files.Length == 0);

            RuleFor(x => x.OrganizationId)
                .GreaterThan(0)
                .When(x => x.OrganizationId == 0);

            RuleFor(x => x.TechnologyIds)
                .Must(x => x == null || x.Length <= 5)
                .WithMessage("Maximum of 5 technologies exceeded");
        });
    }
}

public class UpdatePostValidator : AbstractValidator<UpdatePost>
{
    public UpdatePostValidator()
    {
        RuleSet(ApplyTo.Put, () =>
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Id Required");
            RuleFor(x => x.Title).RequiredTitle();
            RuleFor(x => x.Url).OptionalUrl();
            RuleFor(x => x.Content).OptionalContent();

            RuleFor(x => x.Url)
                .NotEmpty()
                .When(x => string.IsNullOrEmpty(x.Content) && string.IsNullOrEmpty(x.ImageUrl) && Request.Files.Length == 0);

            RuleFor(x => x.OrganizationId)
                .GreaterThan(0)
                .When(x => x.OrganizationId == 0);

            RuleFor(x => x.TechnologyIds)
                .Must(x => x == null || x.Length <= 5)
                .WithMessage("Maximum of 5 technologies exceeded");
        });
    }
}

public class PostCommentValidator : AbstractValidator<PostComment>
{
    public PostCommentValidator()
    {
        RuleSet(ApplyTo.Put | ApplyTo.Post, () =>
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Id Required");
            RuleFor(x => x.Content).OptionalContent();
        });
    }
}