﻿using LearnTogether.Application.Services;
using Microsoft.AspNetCore.Mvc;
using LearnTogether.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace LearnTogether.API.Controllers;
[ApiController]
[Route("/api/[controller]")]
public class SubscriptionController : ControllerBase
{
    private readonly SubscriptionRepository _subscriptionRepository;

    public SubscriptionController(SubscriptionRepository? subscription, SubscriptionRepository subscriptionRRepository)
    {
        _subscriptionRepository = subscriptionRRepository;
    }

    [Authorize]
    [HttpPost("subscribe-to-user")]
    public async Task<IActionResult> SubscribeToUser([FromBody] Guid userId, string notificationMethod)
    {
        var subscription = new Subscription
        {
            UserId = User.GetUserId(),
            SubscribedToUserId = userId,
            NotificationMethod = notificationMethod
        };
        await _subscriptionRepository.AddSubscription(subscription);
        return Ok("Successfully subscribed to user.");
    }

    [Authorize]
    [HttpPost("subscribe-to-subject")]
    public async Task<IActionResult> SubscribeToSubject([FromBody] Guid subjectId, string notificationMethod)
    {
        var subscription = new Subscription
        {
            UserId = User.GetUserId(),
            SubscribedToSubjectId = subjectId.GetHashCode(),
            NotificationMethod = notificationMethod
        };
        await _subscriptionRepository.AddSubscription(subscription);
        return Ok("Successfully subscribed to subject.");
    }


    [Authorize]
    [HttpDelete("unsubscribe/{id}")]
    public async Task<IActionResult> Unsubscribe(int id)
    {
        await _subscriptionRepository.RemoveSubscription(id);
        return Ok("Success unsubscribed");
    }
    
    [Authorize]
    [HttpGet("my-subscriptions")]
    public async Task<IActionResult> GetMySubscriptions()
    {
        var userId = User.GetUserId();
        var subscriptions = await _subscriptionRepository.GetSubscriptionsByUserId(userId);

        var result = subscriptions.Select(subscription => new 
        {
            SubscriptionType = subscription.SubscribedToUserId.HasValue ? "User" : "Subject",
            SubscribedTo = subscription.SubscribedToUserId.HasValue 
                ? subscription.SubscribedToUserId.ToString() 
                : subscription.SubscribedToSubjectId.ToString(),
            NotificationMethod = subscription.NotificationMethod
        });

        return Ok(result);
    }
}