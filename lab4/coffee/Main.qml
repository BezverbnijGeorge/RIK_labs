import QtQuick
import QtQuick.Controls
import QtQuick.Controls.Material
import QtQuick.Layouts
import QtQuick.Dialogs
import MyBackend 1.0

ApplicationWindow {
    id: window
    visible: true
    width: 360
    height: 640
    title: "Мій Редактор"

    Material.theme: Material.Light
    Material.accent: Material.Blue
    Material.primary: Material.Blue

    FileHandler { id: fileHandler }

    FileDialog {
        id: openDialog
        title: "Виберіть файл"
        onAccepted: myTextArea.text = fileHandler.openFile(selectedFile)
    }

    FileDialog {
        id: saveDialog
        title: "Зберегти файл"
        fileMode: FileDialog.SaveFile
        onAccepted: fileHandler.saveFile(selectedFile, myTextArea.text)
    }

    Drawer {
        id: drawer
        width: window.width * 0.7
        height: window.height

        ColumnLayout {
            anchors.fill: parent
            anchors.margins: 25
            spacing: 20

            Button {
                text: "Створити новий"
                Layout.fillWidth: true
                onClicked: { myTextArea.text = ""; drawer.close(); }
            }
            Button {
                text: "Відкрити..."
                Layout.fillWidth: true
                onClicked: { openDialog.open(); drawer.close(); }
            }
            Button {
                text: "Зберегти як..."
                Layout.fillWidth: true
                onClicked: { saveDialog.open(); drawer.close(); }
            }
            Item { Layout.fillHeight: true }
            Button {
                text: "Вихід"
                Layout.fillWidth: true
                onClicked: Qt.quit()
            }
        }
    }

    Page {
        anchors.fill: parent

        header: ToolBar {
            RowLayout {
                anchors.fill: parent
                ToolButton {
                    text: "☰"
                    font.pixelSize: 28
                    onClicked: drawer.open()
                }
                Label {
                    text: "Мій Редактор"
                    font.pixelSize: 20
                    horizontalAlignment: Qt.AlignHCenter
                    Layout.fillWidth: true
                }
            }
        }

        ScrollView {
            anchors.fill: parent
            anchors.margins: 15
            contentWidth: availableWidth

            TextArea {
                id: myTextArea
                placeholderText: "Почніть писати тут..."
                font.pixelSize: 18
                wrapMode: TextArea.Wrap
                background: Item {}
            }
        }

        MouseArea {
            anchors.fill: parent
            z: -1
            onClicked: myTextArea.forceActiveFocus()
        }
    }
}