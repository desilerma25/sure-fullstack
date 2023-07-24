from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from intsureview_be.apps.api.serializers import UserSerializer, GroupSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(["POST"])
def form_api(request):
    if request.method == "POST":
        try:
            name_input = request.POST.get("nameInput")
            select_input = request.POST.get("selectInput")
            radio_input = request.POST.get("radioInput")
            phone_input = request.POST.get("phoneInput")
            email_input = request.POST.get("emailInput")

            return JsonResponse({"message": "Form data received successfully!"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed"}, status=405)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
