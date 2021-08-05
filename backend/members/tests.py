from datetime import date

from django.test import TestCase
from .models import Member

# Create your tests here.
class MemberTests(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        testMember = Member.objects.create(
            name="Christian Pulisic",
            birth=date(1998, 9, 18),
            clubName='Chelsea FC'
        )

        testMember.save()

    def test_member_content(self):
        member = Member.objects.get(id=1)
        name = f'{member.name}'
        birth = f'{member.birth}'
        clubName = f'{member.clubName}'

        self.assertEqual(name, 'Christian Pulisic')
        self.assertEqual(birth, '1998-09-18')
        self.assertEqual(clubName, 'Chelsea FC')
