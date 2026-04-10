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

    FileHandler {
        id: fileHandler
    }

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

    // ВИСУВНЕ МЕНЮ
    Drawer {
        id: drawer
        width: window.width * 0.7
        height: window.height

        background: Rectangle {
            color: Qt.rgba(1, 1, 1, 0.85)
        }

        ColumnLayout {
            anchors.fill: parent
            anchors.margins: 25
            spacing: 20

            Button {
                text: "Створити новий"
                Layout.fillWidth: true
                contentItem: Text {
                    text: parent.text
                    font.pixelSize: 18
                    color: parent.pressed ? "#888888" : "#000000"
                    verticalAlignment: Text.AlignVCenter
                }
                background: Item {}
                onClicked: { myTextArea.text = ""; drawer.close(); }
            }

            Button {
                text: "Відкрити..."
                Layout.fillWidth: true
                contentItem: Text {
                    text: parent.text
                    font.pixelSize: 18
                    color: parent.pressed ? "#888888" : "#000000"
                    verticalAlignment: Text.AlignVCenter
                }
                background: Item {}
                onClicked: { openDialog.open(); drawer.close(); }
            }

            Button {
                text: "Зберегти як..."
                Layout.fillWidth: true
                contentItem: Text {
                    text: parent.text
                    font.pixelSize: 18
                    color: parent.pressed ? "#888888" : "#000000"
                    verticalAlignment: Text.AlignVCenter
                }
                background: Item {}
                onClicked: { saveDialog.open(); drawer.close(); }
            }

            Item { Layout.fillHeight: true } // Розпірка

            Button {
                text: "Вихід"
                Layout.fillWidth: true
                contentItem: Text {
                    text: parent.text
                    font.pixelSize: 18
                    color: parent.pressed ? "#ff8888" : "#ff0000"
                    verticalAlignment: Text.AlignVCenter
                }
                background: Item {}
                onClicked: Qt.quit()
            }
        }
    }

    // ==========================================
    // ЖОРСТКА ВЕРСТКА: Ніщо не зрушить ці блоки
    // ==========================================

    // 1. ВЕРХНЯ ПАНЕЛЬ (Замість header)
    ToolBar {
        id: topBar
        x: 0
        y: 0
        width: parent.width
        height: 56 // Стандартна висота Android шапки

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
                Layout.fillWidth: true
                horizontalAlignment: Qt.AlignHCenter
            }
        }
    }

    // 2. ЗОНА ТЕКСТУ
    ScrollView {
        id: scrollArea
        x: 0
        y: topBar.height // Починається строго під шапкою (56 px)
        width: parent.width
        // Висота = весь екран МІНУС шапка. Коли виїде клавіатура, екран зменшиться, і ця математика спрацює ідеально.
        height: parent.height - topBar.height

        contentWidth: availableWidth

        TextArea {
            id: myTextArea
            width: parent.width
            placeholderText: "Почніть писати тут..."
            font.pixelSize: 18
            wrapMode: TextArea.Wrap
            verticalAlignment: TextInput.AlignTop
            background: Item {} // Прибирає підкреслення

            // Відступи всередині самого тексту, а не ззовні
            padding: 15
        }
    }

    // Змушуємо клавіатуру відкриватися, якщо клікнути повз текст
    MouseArea {
        x: 0
        y: topBar.height
        width: parent.width
        height: parent.height - topBar.height
        z: -1
        onClicked: myTextArea.forceActiveFocus()
    }
}