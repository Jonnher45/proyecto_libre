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
    is_correct = int(request.POST["is_correct"])    
    # Obtener el objeto Word utilizando el ID proporcionado
    word = Word.objects.get(pk=word_id)        
    score = 0    
    if is_correct == 1:
        score = word.level.weight
    # Crear un nuevo objeto Attemp con las claves foráneas y otros campos
    registro = Attemp(
        word = word,
        attemps = attemps,
        is_correct = is_correct,
        score = score
    )
    registro.save()
    return redirect("home")

def crud(request):
    data={}
    palabras = Word.objects.all()
    niveles = Level.objects.all()
    data["palabras"] = palabras
    data["niveles"] = niveles
    return render(request, "crud.html", data)

def crearPalabra(request):
    word = request.POST.get("txtWord")
    answer = request.POST.get("txtAnswer")
    levelf = request.POST.get("flexRadioDefault")
    level = Level.objects.get(pk=levelf)
    palabra = Word(
        word = word,
        answer = answer,
        level = level,
    )
    palabra.save()
    return redirect("crud")

def edicionPalabra(request,id):
    data={}
    palabra = Word.objects.get(id = id)
    niveles = Level.objects.all()
    data["palabra"] = palabra
    data["niveles"] = niveles
    return render(request, "editar.html", data)

def editarPalabra(request):
    id = request.POST.get("txtCodigo")
    word = request.POST.get("txtWord")
    answer = request.POST.get("txtAnswer")
    levelf = request.POST.get("flexRadioDefault")
    level = Level.objects.get(pk=levelf)
    palabra = Word.objects.get(id = id)
    palabra.word = word
    palabra.answer = answer
    palabra.level = level
    palabra.save()
    return redirect("crud")

def eliminarPalabra(request,id):
    word = Word.objects.get(id = id)
    word.delete()
    return redirect("crud")