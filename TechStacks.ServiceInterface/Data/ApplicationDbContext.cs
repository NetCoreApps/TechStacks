
#nullable enable

using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace TechStacks.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
    : IdentityDbContext<ApplicationUser, ApplicationRole, int>(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}

/// <summary>
/// Alias used to override PostgreSQL naming convention to match column name used in EF Tables
/// </summary>
[Alias("AspNetRoles")]
public class ApplicationRole : IdentityRole<int>
{
    public ApplicationRole() {}
    public ApplicationRole(string roleName) : base(roleName) {}
    
    [Alias(nameof(Id))]
    public override int Id { get; set; } = default!;
    [Alias(nameof(Name))]
    public override string? Name { get; set; }
    [Alias(nameof(NormalizedName))]
    public override string? NormalizedName { get; set; }
    [Alias(nameof(ConcurrencyStamp))]
    public override string? ConcurrencyStamp { get; set; }
}

[Alias("AspNetUsers")]
public class ApplicationUser : IdentityUser<int>
{
    [PersonalData]
    [Alias(nameof(Id))]
    public override int Id { get; set; } = default!;
    [ProtectedPersonalData]
    [Alias(nameof(UserName))]
    public override string? UserName { get; set; }
    [Alias(nameof(NormalizedUserName))]
    public override string? NormalizedUserName { get; set; }
    [ProtectedPersonalData]
    [Alias(nameof(Email))]
    public override string? Email { get; set; }
    [Alias(nameof(NormalizedEmail))]
    public override string? NormalizedEmail { get; set; }
    [PersonalData]
    [Alias(nameof(EmailConfirmed))]
    public override bool EmailConfirmed { get; set; }
    [Alias(nameof(PasswordHash))]
    public override string? PasswordHash { get; set; }
    [Alias(nameof(SecurityStamp))]
    public override string? SecurityStamp { get; set; }
    [Alias(nameof(ConcurrencyStamp))]
    public override string? ConcurrencyStamp { get; set; } = Guid.NewGuid().ToString();
    [ProtectedPersonalData]
    [Alias(nameof(PhoneNumber))]
    public override string? PhoneNumber { get; set; }
    [PersonalData]
    [Alias(nameof(PhoneNumberConfirmed))]
    public override bool PhoneNumberConfirmed { get; set; }
    [PersonalData]
    [Alias(nameof(TwoFactorEnabled))]
    public override bool TwoFactorEnabled { get; set; }
    [Alias(nameof(LockoutEnd))]
    public override DateTimeOffset? LockoutEnd { get; set; }
    [Alias(nameof(LockoutEnabled))]
    public override bool LockoutEnabled { get; set; }
    [Alias(nameof(AccessFailedCount))]
    public override int AccessFailedCount { get; set; }    
    
    [Alias(nameof(FirstName))]
    public string? FirstName { get; set; }
    [Alias(nameof(LastName))]
    public string? LastName { get; set; }
    [Alias(nameof(DisplayName))]
    public string? DisplayName { get; set; }
    [Alias(nameof(ProfileUrl))]
    public string? ProfileUrl { get; set; }
    [Alias(nameof(IpAddress))]
    public string? IpAddress { get; set; }
    [Alias(nameof(RefSource))]
    public string? RefSource { get; set; }
    [Alias(nameof(RefUrn))]
    public string? RefUrn { get; set; }
    [Alias(nameof(Banned))]
    public DateTime? Banned { get; set; }
    [Alias(nameof(BannedBy))]
    public string? BannedBy { get; set; }
    [Alias(nameof(Notes))]
    public string? Notes { get; set; }
    [Alias(nameof(DisableEmails))]
    public DateTime? DisableEmails { get; set; }
    [Alias(nameof(CreatedBy))]
    public string? CreatedBy { get; set; }
    [Alias(nameof(CreatedDate))]
    public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
    [Alias(nameof(ModifiedDate))]
    public DateTime? ModifiedDate { get; set; } = DateTime.UtcNow;
}
