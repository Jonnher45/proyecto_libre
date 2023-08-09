from django.utils import timezone
from django.db import models

class Level(models.Model):
    name = models.CharField(max_length=50, null= False, blank= False)
    weight = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class Word(models.Model):
    word = models.CharField(max_length=50, null= False, default="")
    answer = models.CharField(max_length=50)
    level = models.ForeignKey(Level, on_delete=models.CASCADE)

    def __str__(self):
        return self.word
    


class Attemp(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    attemps = models.IntegerField(default=0)
    is_correct = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.created_date)