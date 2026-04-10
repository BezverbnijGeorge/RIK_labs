#ifndef FILEHANDLER_H
#define FILEHANDLER_H

#include <QObject>
#include <QString>
#include <QFile>
#include <QTextStream>
#include <QUrl>
#include <QQmlEngine> // <-- ДОДАНО ДЛЯ СУЧАСНОГО QT 6

class FileHandler : public QObject {
    Q_OBJECT
    QML_ELEMENT // <-- ДОДАНО (дозволяє QML бачити цей клас)

public:
    explicit FileHandler(QObject *parent = nullptr) : QObject(parent) {}

    Q_INVOKABLE bool saveFile(const QUrl &fileUrl, const QString &content) {
        QString filePath = fileUrl.isLocalFile() ? fileUrl.toLocalFile() : fileUrl.toString();
        QFile file(filePath);
        if (file.open(QIODevice::WriteOnly | QIODevice::Text)) {
            QTextStream out(&file);
            out << content;
            file.close();
            return true;
        }
        return false;
    }

    Q_INVOKABLE QString openFile(const QUrl &fileUrl) {
        QString filePath = fileUrl.isLocalFile() ? fileUrl.toLocalFile() : fileUrl.toString();
        QFile file(filePath);
        if (file.open(QIODevice::ReadOnly | QIODevice::Text)) {
            QTextStream in(&file);
            QString content = in.readAll();
            file.close();
            return content;
        }
        return "";
    }
};

#endif // FILEHANDLER_H