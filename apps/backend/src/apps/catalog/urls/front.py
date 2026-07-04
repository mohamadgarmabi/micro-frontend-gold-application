from rest_framework.routers import SimpleRouter
from ..views.front import FrontCategoryViewSet

app_name ="front"

router = SimpleRouter()

router.register("categories", FrontCategoryViewSet)

urlpatterns = [] + router.urls
