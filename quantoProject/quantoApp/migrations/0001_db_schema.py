# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Items'
        db.create_table(u'quantoApp_items', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.TextField')(max_length=100)),
        ))
        db.send_create_signal(u'quantoApp', ['Items'])


    def backwards(self, orm):
        # Deleting model 'Items'
        db.delete_table(u'quantoApp_items')


    models = {
        u'quantoApp.items': {
            'Meta': {'object_name': 'Items'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['quantoApp']