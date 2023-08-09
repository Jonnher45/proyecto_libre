from django.shortcuts import redirect, render
from app1.models import Level, Word, Attemp
import random

def game(request, id):
    random_word = random.choice(Word.objects.filter(level_id=id))    
    return render(request, 'game.html', {'word': random_word})



def home(request):    
    data={}
    level = Level.objects.all()
    attemp = Attemp.objects.all()
    data["levels"]= level
    data["attemps"]= attemp
    return render(request, "home.html",data)

def registrar(request):
    word_id = int(request.POST["word"])
    attemps = int(request.POST["attemps"])
    is_correct = bool(request.POST["is_correct"])

    # Obtener el objeto Word utilizando el ID proporcionado
    word = Word.objects.get(pk=word_id)

    # Crear un nuevo objeto Attemp con las claves foráneas y otros campos
    registro = Attemp.objects.create(
        word=word,
        attemps=attemps,
        is_correct=is_correct,
    )
    return redirect("home")