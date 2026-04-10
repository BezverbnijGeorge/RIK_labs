import QtQuick
import QtQuick.Controls
import QtQuick.Controls.Material
import QtQuick.Layouts
import QtQuick.Dialogs
import MyBackend 1.0
import QtQuick.VirtualKeyboard

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
        dragMargin: 40

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

    Item {
        anchors.fill: parent

        // 1. Жорстко фіксований тулбар (замість header)
        ToolBar {
            id: topBar
            anchors.top: parent.top // Намертво прибиваємо до верху
            anchors.left: parent.left
            anchors.right: parent.right

            RowLayout {
                anchors.fill: parent
                ToolButton {
                    text: "Меню"
                    font.pixelSize: 15
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

        // Фон для безпечного фокусу
        MouseArea {
            anchors.top: topBar.bottom
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.bottom: parent.bottom
            z: -1
            onClicked: myTextArea.forceActiveFocus()
        }

        // 2. Зона тексту
        Flickable {
            id: flickable
            // Прив'язуємо верх до тулбара, а низ - до кінця вікна
            anchors.top: topBar.bottom
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.bottom: parent.bottom

            anchors.topMargin: 10
            anchors.leftMargin: 15
            anchors.rightMargin: 15
            clip: true // Щоб текст не заїжджав під тулбар

            TextArea.flickable: TextArea {
                id: myTextArea
                placeholderText: ""
                font.pixelSize: 18
                wrapMode: TextArea.Wrap
                verticalAlignment: TextInput.AlignTop
                background: Item {}

                // Спеціальний курсор, щоб Android не малював свою "краплю"
                cursorDelegate: Rectangle {
                    width: 2
                    color: Material.accent
                    visible: myTextArea.activeFocus
                    SequentialAnimation on opacity {
                        loops: Animation.Infinite
                        NumberAnimation { to: 0; duration: 500 }
                        NumberAnimation { to: 1; duration: 500 }
                    }
                }
            }

            ScrollBar.vertical: ScrollBar {}
        }
    }

    InputPanel {
        id: inputPanel
        z: 99
        y: active ? parent.height - height : parent.height + height

                anchors.left: parent.left
                anchors.right: parent.right

                Behavior on y {
                    NumberAnimation { duration: 250; easing.type: Easing.InOutQuad }
                }

                transform: Scale {
                    origin.y: inputPanel.height
                    yScale: 2
                }

    }
}