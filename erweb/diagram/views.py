from django.shortcuts import render_to_response

def index(request):
	#path = sys.path
	return render_to_response('index.html', {  })