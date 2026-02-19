using Microsoft.Win32;
using System.IO;
using System.Windows;

namespace TextEditorWPF
{
    public partial class MainWindow : Window
    {
        private string currentFilePath = null;
        private bool isModified = false;

        public MainWindow()
        {
            InitializeComponent();
            UpdateTitle();
        }

        
        private void UpdateTitle()
        {
            if (currentFilePath == null)
                Title = "Text Editor - Новий файл" + (isModified ? " *" : "");
            else
                Title = "Text Editor - " + Path.GetFileName(currentFilePath) + (isModified ? " *" : "");
        }

        
        private void New_Click(object sender, RoutedEventArgs e)
        {
            if (!ConfirmSave()) return;

            Editor.Clear();
            currentFilePath = null;
            isModified = false;
            UpdateTitle();
        }

        
        private void Open_Click(object sender, RoutedEventArgs e)
        {
            if (!ConfirmSave()) return;

            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "Text files (*.txt)|*.txt|All files (*.*)|*.*";

            if (ofd.ShowDialog() == true)
            {
                Editor.Text = File.ReadAllText(ofd.FileName);
                currentFilePath = ofd.FileName;
                isModified = false;
                UpdateTitle();
            }
        }

        
        private void Save_Click(object sender, RoutedEventArgs e)
        {
            if (currentFilePath == null)
            {
                SaveAs_Click(sender, e);
                return;
            }

            File.WriteAllText(currentFilePath, Editor.Text);
            isModified = false;
            UpdateTitle();
        }

        
        private void SaveAs_Click(object sender, RoutedEventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            sfd.Filter = "Text files (*.txt)|*.txt|All files (*.*)|*.*";

            if (sfd.ShowDialog() == true)
            {
                currentFilePath = sfd.FileName;
                File.WriteAllText(currentFilePath, Editor.Text);
                isModified = false;
                UpdateTitle();
            }
        }

        
        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            if (!ConfirmSave()) return;
            Application.Current.Shutdown();
        }

        
        private void Editor_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            isModified = true;
            UpdateTitle();
        }

        
        private bool ConfirmSave()
        {
            if (!isModified) return true;

            MessageBoxResult result = MessageBox.Show(
                "Файл було змінено. Зберегти зміни?",
                "Підтвердження",
                MessageBoxButton.YesNoCancel,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                Save_Click(null, null);
                return true;
            }

            if (result == MessageBoxResult.No)
                return true;

            return false;
        }
    }
}
