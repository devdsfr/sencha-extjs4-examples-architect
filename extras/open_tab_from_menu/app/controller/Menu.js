/*
 * File: app/controller/Menu.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Sencha.controller.Menu', {
    extend: 'Ext.app.Controller',

    models: [
        'MenuRoot',
        'MenuItem'
    ],
    stores: [
        'Menu'
    ],
    views: [
        'Menu',
        'MenuItem'
    ],

    refs: [
        {
            ref: 'mainPanel',
            selector: 'myviewport #mainPanel',
            xtype: 'Ext.tab.Panel'
        }
    ],

    onPanelRender: function(component, eOpts) {
        this.getMenuStore().load(function(records, op, success){

            var menuPanel = Ext.ComponentQuery.query('menu')[0];

            Ext.each(records, function(root){

                var menu = Ext.create('Sencha.view.MenuItem',{
                    title: root.get('title'),
                    iconCls: root.get('iconCls')
                });

                Ext.each(root.items(), function(itens){

                    Ext.each(itens.data.items, function(item){

                        menu.getRootNode().appendChild({
                            text: item.get('text'), 
                            leaf: true, 
                            iconCls: item.get('iconCls'),
                            id: item.get('id'),
                            className: item.get('className') 
                        });
                    });  
                });

                menuPanel.add(menu);
            }); 
        });
    },

    onTreepanelSelect: function(rowmodel, record, index, eOpts) {
        //Ext.Msg.alert('You selected the following menu item', record.get('text'));

        var mainPanel = this.getMainPanel();

        var newTab = mainPanel.items.findBy(
        function (tab){ 
            return tab.title === record.get('text'); 
        }
        );

        if (!newTab){
            newTab = mainPanel.add({
                xtype: record.raw.className,
                closable: true,
                iconCls: record.get('iconCls'),
                title: record.get('text')
            });
        }

        mainPanel.setActiveTab(newTab);
    },

    init: function(application) {
        this.control({
            "menu": {
                render: this.onPanelRender
            },
            "treepanel": {
                select: this.onTreepanelSelect
            }
        });
    }

});
