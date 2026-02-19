namespace WinFormsApp
{
    public partial class Form1 : Form
    {
        string currentFilePath = null;
        public Form1()
        {
            InitializeComponent();
        }

        private void newToolStripMenuItem_Click(object sender, EventArgs e)
        {
            textBox1.Clear();
            currentFilePath = null;
        }

        private void openToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog openDialog = new OpenFileDialog();
            openDialog.Filter = "Text files (*.txt)|*.txt|All files (*.*)|*.*";

            if (openDialog.ShowDialog() == DialogResult.OK)
            {
                textBox1.Text = File.ReadAllText(openDialog.FileName);
                currentFilePath = openDialog.FileName;
            }
        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (currentFilePath == null)
            {
                SaveFileDialog saveDialog = new SaveFileDialog();
                saveDialog.Filter = "Text files (*.txt)|*.txt|All files (*.*)|*.*";

                if (saveDialog.ShowDialog() == DialogResult.OK)
                    currentFilePath = saveDialog.FileName;
                else
                    return;
            }

            File.WriteAllText(currentFilePath, textBox1.Text);
        }

        private void quitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void saveAsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveDialog = new SaveFileDialog();
            saveDialog.Filter = "Text files (*.txt)|*.txt|All files (*.*)|*.*";

            if (saveDialog.ShowDialog() == DialogResult.OK)
            {
                currentFilePath = saveDialog.FileName;
                File.WriteAllText(currentFilePath, textBox1.Text);
                
            }
        }
    }
}
