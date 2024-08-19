from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    clerk_id = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateField(default=timezone.now)
    updated_at = models.DateField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.first_name} {self.last_name}")
            suffix = 1
            while User.objects.filter(slug=self.slug).exists():
                self.slug = slugify(f"{self.first_name} {self.last_name} {suffix}")
                suffix += 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email